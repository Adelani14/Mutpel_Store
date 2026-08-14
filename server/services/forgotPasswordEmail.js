import axios from "axios";

const forgotPasswordEmail = async (user, resetUrl) => {
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
        Reset Your Password 🔐
    </h2>

    <p style="font-size:16px; color:#444;">
        Hello <strong>${user.firstname}</strong>,
    </p>

    <p style="font-size:16px; color:#444; line-height:1.6;">
        We received a request to reset the password for your 
        <strong>Mutpel Store</strong> account.
    </p>

    <p style="font-size:16px; color:#444; line-height:1.6;">
        If you made this request, click the button below to create 
        a new password for your account.
    </p>


    <div style="text-align:center; margin:30px 0;">

        <a
            href="${resetUrl}"
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
            Reset Password
        </a>

    </div>


    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        This password reset link will expire in 
        <strong>15 minutes</strong> for security reasons.
    </p>


    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        If you did not request a password reset, you can safely ignore 
        this email. Your password will remain unchanged.
    </p>


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

export default forgotPasswordEmail;