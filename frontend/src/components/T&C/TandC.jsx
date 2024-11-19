import "./TandC.css"
const termsAndConditions = [
  {
    section: "Acceptance of Terms",
    content: "By accessing and using this e-commerce platform, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    section: "Account Registration",
    content: "To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and agree to accept responsibility for all activities that occur under your account.",
  },
  {
    section: "Product Information",
    content: "We make every effort to ensure the accuracy of the product information on our platform. However, we do not warrant that product descriptions, prices, or other content on the site are accurate, complete, reliable, current, or error-free.",
  },
  {
    section: "Orders and Payments",
    content: "Placing an order constitutes an offer to purchase the product. All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product information, or errors in pricing. Payment for orders will be processed securely through our designated payment gateway. By providing your payment information, you represent and warrant that you have the legal right to use the payment method.",
  },
  {
    section: "Shipping and Delivery",
    content: "We will make every effort to ensure timely delivery of your order. However, we are not responsible for delays caused by events beyond our control, such as natural disasters, strikes, or customs issues.",
  },
  {
    section: "Returns and Refunds",
    content: "Please refer to our Return Policy for information on returns and refunds.",
  },
  {
    section: "User Conduct",
    content: "You agree not to use the platform for any unlawful purpose or in a way that violates these terms and conditions. You also agree not to use the platform to engage in any activity that could harm, disable, overburden, or impair the platform.",
  },
  {
    section: "Admin Panel Usage",
    content: "Access to the admin panel is restricted to authorized personnel only. Unauthorized access or use of the admin panel may result in legal action.",
  },
  {
    section: "Limitation of Liability",
    content: "To the extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform or the admin panel.",
  },
  {
    section: "Governing Law",
    content: "These terms and conditions are governed by the laws of [Your Jurisdiction]. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].",
  },
  {
    section: "Changes to Terms",
    content: "We reserve the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on the platform. Your continued use of the platform after such changes constitutes your acceptance of the modified terms.",
  },
];

const TandC = () => {
  return (
    <div className='tc-container'>
      <h2>Terms and Conditions</h2>
      <div>
        {
          termsAndConditions.map((item, i) => (
            <div key={item.section} className="tc">
              <h3>{i + 1}{". "}{item.section}</h3>
              <p>{item.content}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TandC