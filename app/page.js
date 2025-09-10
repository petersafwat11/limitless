import Image from "next/image";
import styles from "./page.module.css";
import Header from "../ui/main-pages/header/Header";
import ChooseService from "../ui/main-pages/chooseService/ChooseService";
import OurBenifits from "../ui/main-pages/ourBenifits/OurBenifits";
import QuestionsAnswered from "../ui/main-pages/questionsAnswered/QuestionsAnswered";
import Reviews from "../ui/main-pages/reviews/Reviews";
export default function Home() {
  const features = [
    {
      img: {
        src: "/svg/home-feature-1.svg",
        alt: "feature1",
        width: 50,
        height: 50,
      },
      title: "Get insured for Impound, Teamp or Delivery insurance",
    },
    {
      img: {
        src: "/svg/home-feature-2.svg",
        alt: "feature1",
        width: 52,
        height: 53,
      },
      title: "Available to drivers aged 18-75",
    },
    {
      img: {
        src: "/svg/home-feature-3.svg",
        alt: "feature3",
        width: 46,
        height: 57,
      },
      title: "Eligible for cars, vans, scooters or motor-homes",
    },
  ];
  const benifits = [
    {
      title: "No hidden fees - what you see is what you get",
      img: {
        src: "/svg/transparent.svg",
        alt: "transparent",
        width: 150,
        height: 105,
      },
    },
    {
      title: "Flexible duration on temporary insurance.",
      img: {
        src: "/svg/flexible.svg",
        alt: "flexible",
        width: 140,
        height: 135,
      },
    },
    {
      title:
        "No long delays or phone calls to solve a claim - all claims are handled online.  ",
      img: {
        src: "/svg/fast.svg",
        alt: "transparent",
        width: 129,
        height: 149,
      },
    },
    {
      title:
        "Accessible to all drivers - all valid license holders aged 17+ are eligible for a quote",
      img: {
        src: "/svg/accessible.svg",
        alt: "accessible",
        width: 134,
        height: 138,
      },
    },
    {
      title:
        "Cheapest rates online - average customer saves 65% when choosing Limitless Cover.",
      img: {
        src: "/svg/cheapest.svg",
        alt: "cheapest",
        width: 147,
        height: 136,
      },
    },
    {
      title:
        "No risk of driving uninsured as we upload to the Motor Insurance Database every day, 365 days a year.",
      img: {
        src: "/svg/no-risk.svg",
        alt: "no-risk",
        width: 165,
        height: 101,
      },
    },
  ];

  return (
    <div className={styles.page}>
      <Header
        subTitle="Welcome Back! We've Got You Covered."
        title="Quick and affordable short-term car insurance"
        description="Join 1 million+ drivers getting a great deal on short-term cover. Drive for hours, days, or weeks with affordable, fully comprehensive policies. It’s quick, easy, and all sorted from your phone."
        features={features}
      />
      <ChooseService />
      <OurBenifits
        benifits={benifits}
        title="Why Choose Limitless Cover"
        description="Discover the benefits of Limitless Cover, showcasing quick and flexible options for UK drivers. Whether a young driver, courier, or reclaiming an impounded vehicle, our tailored solutions provide instant coverage suited to your needs, with inclusivity for all."
      />
      <QuestionsAnswered />
      <div className={styles.reviewsContainer}>
        <Reviews />
      </div>
    </div>
  );
}
