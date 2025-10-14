export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const type = params?.type;
  const step = params?.step;
  const reason = params?.reason;

  // Determine title based on URL parameters
  if (step === "submitted") {
    return { title: "Claim Submitted | Limitless Cover" };
  }
  
  if (type === "optional-cover") {
    return { title: "Optional Claims | Limitless Cover" };
  }
  
  if (type === "car-insurance") {
    if (step === "form") {
      return { title: "Tell us Your Claim | Limitless Cover" };
    }
    if (step === "reason") {
      return { title: "What Happened? | Limitless Cover" };
    }
  }
  
  // Default title
  return { title: "Choose your Claim | Limitless Cover" };
}

export default function SubmitClaimLayout({ children }) {
  return children;
}
