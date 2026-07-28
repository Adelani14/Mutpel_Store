import axios from "axios";

const signUpEmail = async (newUser) => {
    const html = `

    <div style="max-width:600px; margin:30px auto; background:white; padding:30px; border-radius:10px;">

        <h2 style="color:#222; text-align:center;">
            Welcome to Mutpel Store 🎉
        </h2>

        <p style="font-size:16px; color:#444;">
            Hello <strong>${newUser.firstname}</strong>,
        </p>

        <p style="font-size:16px; color:#444;">
            Thank you for creating an account with <strong>Mutpel Store</strong>.
            We are excited to have you join our growing community.
        </p>

        <p style="font-size:16px; color:#444;">
            Your account has been successfully created. You can now explore our products,
            add items to your cart, and enjoy a smooth shopping experience.
        </p>


        <div style="text-align:center; margin:30px 0;">
            <a href="https://mutpel-store.vercel.app"
               style="
               background:#111827;
               color:white;
               padding:14px 25px;
               text-decoration:none;
               border-radius:6px;
               display:inline-block;
               font-weight:bold;
               ">
                Start Shopping
            </a>
        </div>


        <p style="font-size:14px; color:#666;">
            If you did not create this account, please ignore this email or contact our support team.
        </p>


        <hr style="border:none; border-top:1px solid #eee;">

        <p style="font-size:13px; color:#888; text-align:center;">
            © 2026 Mutpel Store. All rights reserved.
        </p>

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

                        email: newUser.email,

                        name: newUser.firstname

                    }

                ],

                subject: "Welcome to Mutpel Store",

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

export default signUpEmail;