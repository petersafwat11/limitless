"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Selection2 from "@/ui/inputs/selections/selection2/Selection2";
import Selection3 from "@/ui/inputs/selections/selection3/Selection3";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./components.module.css";

const PersonalDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  return (
    <ComponentWrapper title="Personal Details">
      <div className={`${styles.content} ${styles.personalDetailsContainer}`}>
        <div className={styles.row}>
          <FormTextInput
            label="First Name"
            placeholder="Enter your first name"
            {...register("userDetails.firstName")}
            error={errors.userDetails?.firstName}
          />
          <FormTextInput
            label="Last Name"
            placeholder="Enter your last name"
            {...register("userDetails.surname")}
            error={errors.userDetails?.surname}
          />
          <FormDataAndTime
            dateLabel="Date of Birth"
            type="date"
            allowPastDates={true}
            {...register("userDetails.dateOfBirth")}
            value={watch("userDetails.dateOfBirth")}
            error={errors.userDetails?.dateOfBirth}
          />
        </div>

        <div className={styles.row}>
          <FormTextInput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            {...register("userDetails.email")}
            error={errors.userDetails?.email}
          />
          <FormTextInput
            label="Contact Number"
            placeholder="Enter your contact number"
            {...register("userDetails.phone")}
            error={errors.userDetails?.phone}
          />
        </div>

        <div className={styles.row}>
          <FormTextInput
            label="Postcode"
            placeholder="Enter your postcode"
            {...register("userDetails.postCode")}
            error={errors.userDetails?.postCode}
            button={<ConfirmBtn title="Find Address" onClick={() => {}} />}
          />
        </div>

        <div className={styles.row}>
          <FormTextInput
            label="Address"
            placeholder="Enter your Address"
            {...register("userDetails.address")}
            error={errors.userDetails?.address}
          />
          <FormDropdown
            label="Employment Status"
            options={[
              "Self-Employed",
              "Employed",
              "Unemployed",
              "Retired",
              "Student",
            ]}
            placeholder="Choose Employment Status"
            {...register("userDetails.employmentStatus")}
            error={errors.userDetails?.employmentStatus}
          />
        </div>

        <div className={styles.row}>
          <FormTextInput
            label="Industry"
            placeholder="Enter your Industry"
            {...register("userDetails.industry")}
            error={errors.userDetails?.industry}
          />
          <FormTextInput
            label="Occupation"
            placeholder="Enter your Occupation"
            {...register("userDetails.occupation")}
            error={errors.userDetails?.occupation}
          />
        </div>
      </div>

      <div className={styles.selections + " " + styles.selectionsContainer}>
        <Selection2
          title="Where do you keep your car during the day?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          items={[
            "At home",
            "Office or factory car park",
            "Open public car park",
            "Secure public car park",
            "Street away from home",
          ]}
          img={{ src: "/svg/day.svg", alt: "sun", width: 79, height: 106 }}
          selectedItem={watch("carUsage.keepingCarDuringDay")}
          setSelectedItem={(item) =>
            setValue("carUsage.keepingCarDuringDay", item)
          }
        />
        {errors.carUsage?.keepingCarDuringDay && (
          <span className={styles.error}>
            {errors.carUsage.keepingCarDuringDay.message}
          </span>
        )}

        <Selection2
          title="Where do you keep your car during the night?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          items={[
            "Drive",
            "Street outside home",
            "Locked garage",
            "Street away from home",
            "Public car park",
            "Work car park",
            "Private property",
          ]}
          img={{ src: "/svg/night.svg", alt: "moon", width: 79, height: 106 }}
          selectedItem={watch("carUsage.keepingCarDuringNight")}
          setSelectedItem={(item) =>
            setValue("carUsage.keepingCarDuringNight", item)
          }
        />
        {errors.carUsage?.keepingCarDuringNight && (
          <span className={styles.error}>
            {errors.carUsage.keepingCarDuringNight.message}
          </span>
        )}
      </div>

      {/* Car Usage Section - Separate Component Wrapper */}
      {/* <ComponentWrapper title="Car Usage"> */}
      <div className={`${styles.content} ${styles.carUsageContainer}`}>
        <div className={styles.firstSection}>
          <Title title="What do you use the car for?" />
          <div className={styles.selections3}>
            <Selection3
              options={[
                {
                  title: "Social use only",
                  description:
                    "Personal use such as shopping or visiting friends and family.",
                },
                {
                  title: "Social and commuting",
                  description:
                    "Personal use and driving to and from a single place of work or study.",
                },
                {
                  title: "Social, commuting and business",
                  description:
                    "You drive to various locations for work. You can also add other drivers who use this car for business.",
                },
              ]}
              selectedItem={watch("carUsage.usageType")}
              setSelectedItem={(item) => setValue("carUsage.usageType", item)}
            />
            {errors.carUsage?.usageType && (
              <span className={styles.error}>
                {errors.carUsage.usageType.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.secondSection}>
          <div className={styles.row}>
            <FormDropdown
              label="License Type"
              options={["Full UK", "Provisional UK", "International", "Other"]}
              placeholder="Select a license type"
              {...register("carUsage.licenseType")}
              error={errors.carUsage?.licenseType}
            />
            <FormDropdown
              label="License Held"
              options={[
                "Less than 1 year",
                "1-2 years",
                "2-5 years",
                "5-10 years",
                "Over 10 years",
              ]}
              placeholder="Select license held duration"
              {...register("carUsage.licenseHeld")}
              error={errors.carUsage?.licenseHeld}
            />
            <FormTextInput
              label="License No. (Optional)"
              placeholder="Enter license no."
              {...register("carUsage.licenseNumber")}
              error={errors.carUsage?.licenseNumber}
            />
          </div>

          <div className={styles.row}>
            <FormDropdown
              label="No Claims Bonus (NCB) Years"
              options={[
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10+",
              ]}
              placeholder="Select no claims bonus years"
              {...register("carUsage.NCB")}
              error={errors.carUsage?.NCB}
            />
            <FormTextInput
              label="Voluntary Excess"
              placeholder="Enter voluntary excess amount"
              {...register("carUsage.voluntaryExcess")}
              error={errors.carUsage?.voluntaryExcess}
            />
          </div>
        </div>

        <div className={styles.thirdSection}>
          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Do you have any unspent or outstanding criminal convictions?
            </p>
            <YesORNo
              value={watch("carUsage.criminalConvictions")}
              onChange={(value) =>
                setValue("carUsage.criminalConvictions", value)
              }
            />
          </div>

          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Do you have any medical conditions that are notifiable to the
              DVLA?
            </p>
            <YesORNo
              value={watch("carUsage.medicalConditions")}
              onChange={(value) =>
                setValue("carUsage.medicalConditions", value)
              }
            />
          </div>

          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Have you ever had insurance cancelled, a claim refused, a policy
              voided, or any special terms imposed? Unspent or outstanding
              criminal convictions?
            </p>
            <YesORNo
              value={watch(
                "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided"
              )}
              onChange={(value) =>
                setValue(
                  "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
                  value
                )
              }
            />
          </div>
        </div>
      </div>
      {/* </ComponentWrapper> */}
    </ComponentWrapper>
  );
};

export default PersonalDetailsForm;
