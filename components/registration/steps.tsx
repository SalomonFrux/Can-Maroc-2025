import { FaCheck } from "react-icons/fa"; // Using Font Awesome check icon

export function Steps({ currentStep }: { currentStep: number }) {
  const steps = [
    "Informations Personnelles",
    "Organisation du Séjour",
    "Billetterie",
    "Services Additionnels",
    "Accompagnants",
    "Paiement",
    "Validation",
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <nav className="flex justify-between" aria-label="Progress">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <div
                key={step}
                className={`group flex flex-col items-center w-full ${
                  index !== steps.length - 1 ? "border-r border-gray-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-[#009933] text-white"
                        : isCurrent
                        ? "bg-[#FF6600] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheck className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isCurrent ? "text-[#FF6600]" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}