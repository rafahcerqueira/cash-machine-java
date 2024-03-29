import { ReactElement } from "react";
import { Wrapper, WrapperForm, WrapperButtons } from "./styles";
import Steps from "./Steps";
import ButtonDefault from "../ButtonDefault";

type FormStepsProps = {
  formComponents: ReactElement[];
  currentStep: number;
  isLastStep: boolean;
  handleSubmit: () => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function FormSteps({
  formComponents,
  currentStep,
  isLastStep,
  handleSubmit,
  nextStep,
  prevStep,
}: FormStepsProps) {
  const currentComponent = formComponents[currentStep];

  return (
    <Wrapper>
      <Steps currentStep={currentStep} countSteps={formComponents.length} />
      <WrapperForm onSubmit={handleSubmit}>
        <div className="inputs-container">{currentComponent}</div>
        <WrapperButtons>
          {currentStep !== 0 && (
            <ButtonDefault
              variant="outlined"
              color="secondary"
              type="button"
              onClick={() => prevStep()}
              text="VOLTAR"
            />
          )}
          {!isLastStep ? (
            <ButtonDefault
              variant="contained"
              color="secondary"
              text="AVANÇAR"
              type="button"
              onClick={() => nextStep()}
            />
          ) : (
            <ButtonDefault
              variant="contained"
              color="secondary"
              text="CONCLUIR"
              type="button"
              onClick={() => nextStep()}
            />
          )}
        </WrapperButtons>
      </WrapperForm>
    </Wrapper>
  );
}
