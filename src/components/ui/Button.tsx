type StyleType = "primary" | "success" | "fail";
type SizeType = "normal" | "big";

interface ButtonProps extends React.ComponentProps<"button"> {
    styleType: StyleType;
    sizeType?: SizeType;
}

export function Button({ children, styleType, sizeType = "normal", ...props }: ButtonProps) {
    const baseStyles =
        "inline-flex justify-center items-center gap-2 px-[2em] py-[0.2em] whitespace-nowrap border cursor-pointer uppercase transition-colors duration-300";
    const typeStyles: Record<StyleType, string> = {
        primary:
            "text-button-primary-text bg-button-primary-bg border-button-primary-border hover:text-button-primary-text-hover hover:bg-button-primary-bg-hover active:text-button-primary-text-hover active:bg-button-primary-bg-hover",
        success:
            "text-button-success-text bg-button-success-bg border-button-success-border hover:text-button-success-text-hover hover:bg-button-success-bg-hover active:text-button-success-text-hover active:bg-button-success-bg-hover",
        fail: "text-button-fail-text bg-button-fail-bg border-button-fail-border hover:text-button-fail-text-hover hover:bg-button-fail-bg-hover active:text-button-fail-text-hover active:bg-button-fail-bg-hover",
    };
    const sizeStyles: Record<SizeType, string> = {
        normal: "text-base",
        big: "text-lg",
    };

    return (
        <button className={`${baseStyles} ${typeStyles[styleType]} ${sizeStyles[sizeType]}`} {...props}>
            {children}
        </button>
    );
}
