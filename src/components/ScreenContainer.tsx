import * as m from "motion/react-m";
import { type Variants } from "motion";

interface ScreenContainerProps {
    children: React.ReactNode;
}

const mainVariants: Variants = {
    expanded: {
        scaleY: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            when: "beforeChildren",
        },
    },
    collapsed: {
        scaleY: 0,
    },
};

const innerVariants: Variants = {
    expanded: {
        opacity: 1,
    },
    collapsed: {
        opacity: 0,
    },
};

export function ScreenContainer({ children }: ScreenContainerProps) {
    return (
        <m.main
            variants={mainVariants}
            initial="collapsed"
            animate="expanded"
            className="wrapper-main h-full py-1 border border-border-secondary"
        >
            <m.div variants={innerVariants} className="h-full -mx-1 md:-mx-3 px-6 py-1 border border-border-primary">
                {children}
            </m.div>
        </m.main>
    );
}
