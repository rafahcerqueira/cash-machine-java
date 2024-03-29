import { StepsContainer, StepNumber, StepIcon, StepLine } from "./styles";
import { Fragment } from "react";

type StepsProps = {
  currentStep: number;
  countSteps: number;
};

const Steps = ({ currentStep, countSteps }: StepsProps) => {
  return (
    <StepsContainer>
      {Array.from(Array(countSteps).keys()).map((step) => {
        return (
          <Fragment key={step}>
            {step < currentStep ? (
              <StepIcon>
                <span className="material-symbols-outlined">done</span>
              </StepIcon>
            ) : (
              <StepNumber className={currentStep >= step ? "active" : ""}>
                0{step + 1}
              </StepNumber>
            )}
            {step < countSteps - 1 && <StepLine />}
          </Fragment>
        );
      })}
    </StepsContainer>
  );
};

export default Steps;
