import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import './GettingReady.css';

const FinishStepProgressContext = createContext<FinishProgressContextType | undefined>(undefined);

const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
    const [finishStepProgress, setFinishStepProgress] = useState(1);

    return (
        <FinishStepProgressContext.Provider value={{ finishStepProgress, setFinishStepProgress }}>
            {children}
        </FinishStepProgressContext.Provider>
    );
};

const useFinishStepProgress = () => {
    const context = useContext(FinishStepProgressContext);
    if (!context) {
        throw new Error("useFinishStepProgress must be used inside OnboardingProvider");
    }
    return context;
};

interface GettingReadyProps {
    onComplete: () => void;
    userType: 'generator' | 'aggregator' | 'recycler' | 'county-official';
}

export default function GettingReady({ onComplete, userType }: GettingReadyProps) {
    return (
        <OnboardingProvider>
            <GettingReadyMain onComplete={onComplete} userType={userType} />
        </OnboardingProvider>
    );
}

function GettingReadyMain({ onComplete, userType }: GettingReadyProps) {
    const [finishStep, setFinishStep] = useState(-1);
    const [isResetting, setIsResetting] = useState(false);
    const { finishStepProgress, setFinishStepProgress } = useFinishStepProgress();

    const finishStepsGenerator: FinishStep[] = [
        {
            before: {
                title: "Setting up your profile…",
                subtitle: "Preparing your waste management profile"
            },
            after: {
                title: "Profile is ready!",
                subtitle: "Let's optimize your waste collection"
            }
        },
        {
            before: {
                title: "Loading onboarding…",
                subtitle: "Getting everything ready for you"
            },
            after: {
                title: "All set!",
                subtitle: "Time to customize your experience"
            }
        }
    ];

    const finishStepsAggregator: FinishStep[] = [
        {
            before: {
                title: "Setting up your profile…",
                subtitle: "Preparing your collector workspace"
            },
            after: {
                title: "Profile is ready!",
                subtitle: "Let's get you connected"
            }
        },
        {
            before: {
                title: "Loading onboarding…",
                subtitle: "Setting up your collection tools"
            },
            after: {
                title: "All set!",
                subtitle: "Ready to start collecting waste"
            }
        }
    ];

    const finishStepsRecycler: FinishStep[] = [
        {
            before: {
                title: "Setting up your facility…",
                subtitle: "Preparing your recycling center profile"
            },
            after: {
                title: "Facility is ready!",
                subtitle: "Let's configure your waste streams"
            }
        },
        {
            before: {
                title: "Loading onboarding…",
                subtitle: "Setting up pricing and capacity"
            },
            after: {
                title: "All set!",
                subtitle: "Ready to receive waste materials"
            }
        }
    ];

    const finishStepsCountyOfficial: FinishStep[] = [
        {
            before: {
                title: "Setting up your account…",
                subtitle: "Preparing your administrative dashboard"
            },
            after: {
                title: "Account is ready!",
                subtitle: "Let's configure your permissions"
            }
        },
        {
            before: {
                title: "Loading onboarding…",
                subtitle: "Setting up your department access"
            },
            after: {
                title: "All set!",
                subtitle: "Ready to manage your ward"
            }
        }
    ];

    const finishSteps =
        userType === 'generator' ? finishStepsGenerator :
            userType === 'aggregator' ? finishStepsAggregator :
                userType === 'recycler' ? finishStepsRecycler :
                    finishStepsCountyOfficial;
    const finishStepCount = useRef(finishSteps.length);
    const finishStepProgressFrame = useRef(0);
    const finishStepWait = useRef(0);
    const resettingClass = isResetting ? " onboarding--resetting" : "";

    useEffect(() => {
        if (finishStepProgress === 1) {
            setIsResetting(false);
            cancelAnimationFrame(finishStepProgressFrame.current);
            clearTimeout(finishStepWait.current);

            const nextStep = async () => {
                return await new Promise((resolve) => {
                    finishStepWait.current = setTimeout(resolve, 750);
                }).then(() => {
                    setFinishStepProgress(0);
                    setFinishStep((step) => step + 1);
                });
            };
            nextStep();
        }

        return () => clearTimeout(finishStepWait.current);
    }, [finishStepProgress, setFinishStepProgress]);

    useEffect(() => {
        const nextFrame = () => {
            setFinishStepProgress((percent) => {
                const nextAmount = 0.02;
                const next = percent + nextAmount;
                if (next >= 1) return 1;
                return next;
            });
            finishStepProgressFrame.current = requestAnimationFrame(nextFrame);
        };

        if (finishStep > -1 && finishStep < finishStepCount.current) nextFrame();

        return () => cancelAnimationFrame(finishStepProgressFrame.current);
    }, [finishStep, setFinishStepProgress]);

    // Auto-redirect when finished
    useEffect(() => {
        if (finishStep >= finishSteps.length) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [finishStep, finishSteps.length, onComplete]);

    return (
        <div className={`flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8${isResetting ? ' transition-none' : ''}`}>
            <OnboardingFinishSteps currentStep={finishStep} steps={finishSteps} />
            {finishStep >= finishSteps.length && <OnboardingFinished />}
            <OnboardingIconSprites />
        </div>
    );
}

function OnboardingFinished() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col items-center text-center gap-6 p-12 bg-white/5 rounded-2xl border border-white/10 max-w-xl animate-fade-in-up">
                <OnboardingIcon icon="check-circle" color="success" />
                <h1 className='md:text-2xl text-xl text-sky-500 logo-text font-semibold capitalize  mb-4 text-center'>
                    Onboarding On RECYKROUTE
                </h1>
                <h2 className="text-3xl font-bold text-white m-0">All set and ready to go!</h2>
                <p className="text-lg text-white/70 m-0">Taking you to onboarding...</p>
            </div>
        </div>
    );
}

function OnboardingFinishStep({ before, after, phase }: OnboardingFinishStepProps) {
    const progressActive = phase !== "waiting";

    return (
        <div className={`relative ${phase === 'waiting' ? 'opacity-40' : 'opacity-100'}`}>
            <OnboardingFinishStepPhase title={before.title} subtitle={before.subtitle} forProgress={true} progressActive={progressActive} phase={phase} isFirst={true} />
            <OnboardingFinishStepPhase title={after.title} subtitle={after.subtitle} phase={phase} isFirst={false} />
        </div>
    );
}

function OnboardingFinishStepPhase({ title, subtitle, forProgress, progressActive, phase, isFirst }: OnboardingFinishStepPhaseProps) {
    const { finishStepProgress } = useFinishStepProgress();
    const value = progressActive ? finishStepProgress : 0;

    const phaseClasses = !isFirst
        ? `absolute top-0 left-0 right-0 ${phase === 'done' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
        : phase === 'done' ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0';

    return (
        <div className={`flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 ${phaseClasses}`}>
            {forProgress ?
                <OnboardingFinishStepProgress value={value} /> :
                <OnboardingIcon icon="checkmark" color="success" />
            }
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-white m-0">{title}</h2>
                <p className="text-sm text-white/60 mt-1 m-0">{subtitle}</p>
            </div>
        </div>
    );
}

function OnboardingFinishStepProgress({ value = 0 }: OnboardingFinishStepProgressProps) {
    const circumference = 62.83;
    const strokeDash = `${circumference} ${circumference}`;
    const offset = circumference * (1 - value);

    return (
        <svg className="shrink-0 text-blue-500" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
            <g fill="transparent" strokeLinecap="round" strokeWidth="3" transform="rotate(-90,12,12)">
                <circle className="stroke-gray-600" cx="12" cy="12" r="10" />
                <circle stroke="currentColor" cx="12" cy="12" r="10" strokeDasharray={strokeDash} strokeDashoffset={offset} />
            </g>
        </svg>
    );
}

function OnboardingFinishSteps({ currentStep, steps }: OnboardingFinishStepsProps) {
    const { finishStepProgress } = useFinishStepProgress();
    const doneClass = currentStep >= steps.length ? "opacity-0 pointer-events-none" : "";

    return (
        <div className={`flex flex-col gap-8 w-full max-w-2xl transition-opacity duration-300 ${doneClass}`}>
            {steps.map((step, i) => {
                let phase: FinishStepPhaseName = "waiting";

                if (i < currentStep || i === currentStep && finishStepProgress >= 1) {
                    phase = "done";
                } else if (i === currentStep) {
                    phase = "current";
                }

                return <OnboardingFinishStep before={step.before} after={step.after} phase={phase} key={i} />
            })}
        </div>
    );
}

function OnboardingIcon({ icon, color }: OnboardingIconProps) {
    const colorClass = color === 'success' ? 'text-green-500' : '';

    return (
        <svg className={`shrink-0 ${colorClass}`} width="16px" height="16px" aria-hidden="true">
            <use href={`#${icon}`} />
        </svg>
    );
}

function OnboardingIconSprites() {
    const viewBox = "0 0 16 16";

    return (
        <svg width="0" height="0" aria-hidden="true">
            <symbol id="check-circle" viewBox={viewBox}>
                <circle fill="currentcolor" cx="8" cy="8" r="8" />
                <polyline fill="none" stroke="var(--bg)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" points="4 8,7 11,12 5" />
            </symbol>
            <symbol id="checkmark" viewBox={viewBox}>
                <polyline fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="2 7,7 11,15 2" />
            </symbol>
        </svg>
    )
}

type FinishProgressContextType = {
    finishStepProgress: number;
    setFinishStepProgress: Dispatch<SetStateAction<number>>;
};
type FinishStep = {
    before: FinishStepPhase;
    after: FinishStepPhase;
};
type FinishStepPhase = {
    title: string;
    subtitle: string;
};
type FinishStepPhaseName = "waiting" | "current" | "done";
type OnboardingFinishStepProps = {
    before: FinishStepPhase;
    after: FinishStepPhase;
    phase: FinishStepPhaseName;
};
type OnboardingFinishStepsProps = {
    currentStep: number;
    steps: FinishStep[];
};
type OnboardingFinishStepPhaseProps = {
    title: string;
    subtitle: string;
    forProgress?: boolean;
    progressActive?: boolean;
    phase?: FinishStepPhaseName;
    isFirst?: boolean;
};
type OnboardingFinishStepProgressProps = {
    value?: number;
}
type OnboardingIconProps = {
    icon: string;
    color?: string;
};
type OnboardingProviderProps = {
    children: React.ReactNode
};
