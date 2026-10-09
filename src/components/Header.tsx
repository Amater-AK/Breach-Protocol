export function Header() {
    return (
        <header className="flex justify-between items-start gap-6">
            <div className="pl-10 pr-40 py-2 bg-linear-(--gradient-horizontal-stripes) bg-size-[auto_0.26rem] uppercase">
                <p className="px-1 bg-bg-primary">NET&#9776;TECH</p>
            </div>
            <div className="flex justify-end items-end w-1/3 h-8 p-1 text-xxs text-text-negative bg-surface-primary uppercase overflow-hidden">
                <span className="shrink-0">da1fd173-ed90-4b98-9acc-ac44895ee543</span>
            </div>
        </header>
    );
}
