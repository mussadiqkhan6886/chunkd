import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import order from "@/lib/models/OrderSchema";
import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/databse";
import { BoxType, CartItem } from "@/type";
import CookieSchema from "@/lib/models/CookieSchema";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const orders = await order.find({})

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const orderData = JSON.parse(formData.get("orderData") as string);
    const paymentProofFile = formData.get("paymentProof") as File | null;

    const uploadedImages : string[] = []

    if (paymentProofFile && typeof paymentProofFile === "object") {
      const arrayBuffer = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "chunkd",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              )
              .end(buffer);
          });
    
          uploadedImages.push(uploadResult.secure_url);
        }


    const newOrder = await order.create({
      items: orderData.items,
      pricing: orderData.pricing,
      userDetails: orderData.userDetails,
      notes: orderData.notes,
      date: orderData.date,
      time: orderData.time,
      orderType: orderData.orderType,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentProof: uploadedImages[0] || null,
      createdAt: new Date(),
    });

   await Promise.all(
    orderData.items.filter((cookie: CartItem) => cookie.type != "box")
    .map((cookie: CartItem) => 
      CookieSchema.findByIdAndUpdate(cookie.id, {$inc: {soldCount: cookie.quantity}})
    )
   )

   await Promise.all(
      orderData.items
        .filter((cookie: CartItem) => cookie.type === "box")
        .flatMap((cookie: any) =>
          cookie.boxData.map((item: BoxType) =>
            CookieSchema.findByIdAndUpdate(
              item.cookieId,
              { $inc: { soldCount: item.cookieQty } }
            )
          )
        )
    );


  await Promise.all(
  orderData.items
    .filter((cookie: CartItem) => cookie.type === "drop")
    .map((cookie: CartItem) =>
      CookieSchema.findOneAndUpdate(
        {
          _id: cookie.id,
          totalLimit: { $gte: cookie.quantity }
        },
        [
          {
            $set: {
              totalLimit: {
                $subtract: ["$totalLimit", cookie.quantity]
              },
              soldOut: {
                $cond: [
                  {
                    $lte: [
                      { $subtract: ["$totalLimit", cookie.quantity] },
                      0
                    ]
                  },
                  true,
                  false
                ]
              }
            }
          }
        ],
        {
          updatePipeline: true, // 🔥 REQUIRED
          new: true
        }
      )
    )
);


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminHtml = `
      <h2>🛒 New Order Received!</h2>
      <p>A new order has been placed.</p>
      <a href="https://chunkd.vercel.app/admin-dashboard">
        👉 View Order in Admin Dashboard
      </a>
    `;

    await transporter.sendMail({
      from: `"Chunkd Orders" <${process.env.EMAIL_USER}>`,
      to: "mussadiqkhan6886@gmail.com", // admin email
      subject: "New Order Received",
      html: adminHtml,
    });

    const itemsHtml = orderData.items
      .map(
        (item: any) => `
          <tr>
            <td style="padding:8px 0;">
              <strong>${item.name}</strong><br/>
              ${item.boxData
                  ? `
                    <ul>
                      ${item.boxData
                        .map(
                          (cookie: BoxType) =>
                            `<li><strong>${cookie.cookieName}</strong> × ${cookie.cookieQty}</li>`
                        )
                        .join("")}
                    </ul>
                  `
                  : ""
                }
              <small>Qty: ${item.quantity}</small>
            </td>
            <td style="text-align:right; padding:8px 0;">
              Rs. ${item.price * item.quantity}
            </td>
          </tr>
        `
      )
      .join("");

    const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e7eb;">
      
      <h2 style="color:#111827;">✅ Order Confirmed</h2>
      <p>Hi <strong>${orderData.userDetails.fullName}</strong>,</p>

      <p>Thank you for shopping with <strong>Chunkd</strong> 🍪  
      Your order has been placed successfully.</p>

      <hr style="margin:20px 0;" />

      <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
      <p><strong>Order Date:</strong> ${new Date().toDateString()}</p>
      <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>

      <hr style="margin:20px 0;" />

      <h3 style="margin-bottom:10px;">🛒 Order Items</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${itemsHtml}
      </table>

      <hr style="margin:20px 0;" />

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>Subtotal</td>
          <td style="text-align:right;">Rs. ${orderData.pricing.subtotal}</td>
        </tr>

        ${
          orderData.pricing.discountAmount
            ? `
        <tr>
          <td>Discount</td>
          <td style="text-align:right; color:green;">
            - Rs. ${orderData.pricing.discountAmount}
          </td>
        </tr>`
            : ""
        }

        <tr>
          <td>Delivery Charges</td>
          <td style="text-align:right;">Rs. ${orderData.pricing.deliveryCharges}</td>
        </tr>

        <tr>
          <td style="padding-top:10px;"><strong>Total</strong></td>
          <td style="text-align:right; padding-top:10px;">
            <strong>Rs. ${orderData.pricing.total}</strong>
          </td>
        </tr>
      </table>

      <hr style="margin:20px 0;" />

      <h3>📍 Delivery Address</h3>
      <p>
        ${orderData.shippingAddress.address}<br/>
        ${orderData.shippingAddress.city}<br/>
        ${orderData.shippingAddress.address === "pickup" ? "Pick up Address: 116/1 M street 175 Phase 1 DHA" : ""}  <br/>
        ${orderData.date !== "now" ? "Date: " + orderData.date : ""}  <br/>
        ${orderData.time !== "now" ? "Time: " + orderData.time : ""}  
      </p>

      ${
        orderData.notes
          ? `
          <h3>📝 Order Notes</h3>
          <p>${orderData.notes}</p>
          `
          : ""
      }

      <p style="font-size:12px; color:#6b7280;">
        If you have any questions, reply to this email or contact our support.
      </p>

      <p style="margin-top:20px;">
        — <strong>Chunkd Team</strong> 🍪
      </p>
    </div>
    `;


    await transporter.sendMail({
      from: `"Chunkd Orders" <${process.env.EMAIL_USER}>`,
      to: orderData.userDetails.email, // ✅ customer email
      subject: "Your Order Has Been Placed 🎉",
      html: customerHtml,
    });


    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order." },
      { status: 500 }
    );
  }
};

