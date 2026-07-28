import axios from "axios";

const sendOrderEmail = async (order) => {
    const html = `
        <div style="font-family:Arial,sans-serif;padding:20px">

            <h2 style="color:#0d6efd">
                Thank you for shopping with Mutpel Household
            </h2>

            <p>
                Hello <strong>${order.shippingAddress.fullName}</strong>,
            </p>

            <p>
                We've successfully received your payment and your order has been placed.
            </p>

            <hr>

            <h3>Order Summary</h3>

            <p>
                <strong>Reference:</strong>
                ${order.paymentReference}
            </p>

            <p>
                <strong>Total:</strong>
                ₦${order.totalAmount.toLocaleString()}
            </p>

            <p>
                <strong>Payment:</strong>
                Paid
            </p>

            <p>
                <strong>Status:</strong>
                ${order.orderStatus}
            </p>

            <hr>

            <h3>Items</h3>

            ${order.orderItems.map(item => `
                <div style="margin-bottom:12px">
                    <strong>${item.title}</strong><br>
                    Qty: ${item.quantity}<br>
                    ₦${item.subtotal.toLocaleString()}
                </div>
            `).join("")}

            <hr>

            <p>
                We'll notify you again when your order is confirmed and when it has been shipped.
            </p>

            <br>


        </div>
    `;

    try {

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {

                sender: {

                    name: "Mutpel Household",

                    email: process.env.EMAIL_USER

                }, 

                to: [

                    {

                        email: order.shippingAddress.email,

                        name: order.shippingAddress.fullName

                    }

                ],

                subject: "Your Order Has Been Received",

                htmlContent: html

            },

            {

                headers: {

                    "api-key": process.env.BREVO_API_KEY,

                    "Content-Type": "application/json"

                }

            }

        );

        console.log("✅ Email sent");

        return response.data;

    } catch (error) {

        console.log("❌ Brevo API Error");

        console.log(error.response?.data || error.message);

        throw error;

    }

};

export default sendOrderEmail;