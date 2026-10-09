interface ScreenContainerProps {
    children: React.ReactNode;
}

export function ScreenContainer({ children }: ScreenContainerProps) {
    return (
        <main className="wrapper-main h-full py-1 border border-border-secondary">
            <div className="h-full -mx-1 md:-mx-3 px-6 py-1 border border-border-primary">{children}</div>
        </main>
    );
}
