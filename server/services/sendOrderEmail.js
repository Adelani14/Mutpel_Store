import transporter from "../config/email.js";

const sendOrderEmail = async (order) => {
    console.log("1. sendOrderEmail started");

    const html = `
      ...
    `;

    console.log("2. Before sendMail");

    const info = await transporter.sendMail({
        from: `"Mutpel Household" <${process.env.EMAIL_USER}>`,
        to: order.shippingAddress.email,
        subject: "Your Order Has Been Received",
        html,
    });

    console.log("3. After sendMail");
    console.log(info);

    return info;
};

export default sendOrderEmail;