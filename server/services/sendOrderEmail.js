import transporter from "../config/email.js";

const sendOrderEmail = async (order) => {
    console.log("1. sendOrderEmail started");

    const html = `
      ...
    `;
    try {
        console.log("2. Before sendMail");

        const info = await transporter.sendMail({
            from: '"Mutpel Household" <princeadelani27@gmail.com>',
            to: order.shippingAddress.email,
            subject: "Your Order Has Been Received",
            html,
        });

        console.log("3. After sendMail");
        console.log(info);

    } catch (err) {

        console.log("SENDMAIL ERROR");

        console.log(err);

        throw err;
    }
}

export default sendOrderEmail;