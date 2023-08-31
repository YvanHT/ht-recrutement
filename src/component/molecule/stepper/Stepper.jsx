import React, { useState } from 'react';
import {
  HTButton,
  HTSpinner,
} from '@hightao-dev/reactjs';

import './Stepper.scss';

const Stepper = ({
  children,
  spinner,
  disabled,
  handleBack,
  handleFinish,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = React.Children.count(children);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <div className="step-label"><span>{currentStep + 1} / {totalSteps}</span></div>
      <div className="child-content">{children[currentStep]}</div>
      <div className="button-footer">
        <div className="button-prev">
          {currentStep !== 0 && (
            <HTButton onClick={handlePrev}>Précédent</HTButton>
          )}
        </div>
        <div className="button-next">
          <HTButton
            onClick={handleBack}
          >
            Retour
          </HTButton>
          {currentStep !== (totalSteps - 1) ? (
            <HTButton
              onClick={handleNext}
            >
              Suivant
            </HTButton>
          ) : (
            <>
              <HTButton
                onClick={handleFinish}
                disabled={disabled}
              >
                Enregistrer
              </HTButton>
              <div className="block-btn__spinner">
                {spinner && (
                  <HTSpinner />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
