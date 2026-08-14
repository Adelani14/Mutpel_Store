import axios from "axios";

const resetPasswordEmail = async (user) => {
    const html = `

<div style="
    max-width:600px;
    margin:30px auto;
    background:white;
    padding:30px;
    border-radius:10px;
    font-family:Arial, Helvetica, sans-serif;
">

    <h2 style="
        color:#222;
        text-align:center;
        margin-bottom:25px;
    ">
        Password Reset Successful ✅
    </h2>


    <p style="font-size:16px; color:#444;">
        Hello <strong>${user.firstname}</strong>,
    </p>


    <p style="
        font-size:16px;
        color:#444;
        line-height:1.6;
    ">
        Your <strong>Mutpel Store</strong> account password has been 
        successfully changed.
    </p>


    <p style="
        font-size:16px;
        color:#444;
        line-height:1.6;
    ">
        You can now use your new password to log in to your account 
        and continue shopping.
    </p>


    <div style="text-align:center; margin:30px 0;">

        <a
            href="https://mutpel-store.vercel.app/login"
            style="
                background:#111827;
                color:white;
                padding:14px 25px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
                font-weight:bold;
                font-size:15px;
            "
        >
            Login to Your Account
        </a>

    </div>


    <div style="
        background:#f9fafb;
        padding:15px;
        border-radius:6px;
        margin:25px 0;
    ">

        <p style="
            margin:0;
            font-size:14px;
            color:#555;
            line-height:1.6;
        ">
            <strong>Security notice:</strong><br>
            If you did not make this password change, please contact 
            our support team immediately and secure your account.
        </p>

    </div>


    <hr style="
        border:none;
        border-top:1px solid #eee;
        margin:30px 0;
    ">


    <p style="
        font-size:13px;
        color:#888;
        text-align:center;
        line-height:1.5;
    ">
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

                        email: user.email,

                        name: user.firstname

                    }

                ],

                subject: "Reset Your Password",

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

export default resetPasswordEmail;