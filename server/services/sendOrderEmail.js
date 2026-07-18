import transporter from "../config/email.js";

const sendOrderEmail = async (order) => {
    const html = `
        <div style="font-family:Arial,sans-serif;padding:20px">

            <h2 style="color:#0d6efd;">
                Thank you for shopping with Mutpel Household
            </h2>

            <p>Hello <strong>${order.shippingAddress.fullName}</strong>,</p>

            <p>
                We've successfully received your payment and your order has been placed.
            </p>

            <hr>

            <h3>Order Summary</h3>

            <p><strong>Reference:</strong> ${order.paymentReference}</p>

            <p><strong>Total:</strong> ₦${order.totalAmount.toLocaleString()}</p>

            <p><strong>Payment:</strong> Paid</p>

            <p><strong>Status:</strong> ${order.orderStatus}</p>

            <hr>

            <h3>Items</h3>

            ${order.orderItems
            .map(
                item => `
                    <p>
                        ${item.title}<br/>
                        Qty: ${item.quantity}<br/>
                        ₦${item.subtotal.toLocaleString()}
                    </p>
                `
            )
            .join("")}

            <hr>

            <p>
                We'll notify you again when your order is confirmed and when it has been shipped.
            </p>

            <br/>

            <strong>Mutpel Household</strong>

        </div>
    `;

    await transporter.sendMail({
        from: `"Mutpel Household" <${process.env.EMAIL_USER}>`,
        to: order.shippingAddress.email,
        subject: "Your Order Has Been Received",
        html,
    });
};

export default sendOrderEmail;