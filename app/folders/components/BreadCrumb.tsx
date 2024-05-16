import * as React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & {
        separator?: React.ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
            className
        )}
        {...props}
    />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-normal text-foreground", className)}
        {...props}
    />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}>
        {children ?? ">"}
    </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}>
        {/* <DotsHorizontalIcon className="h-4 w-4" /> */}
        ...
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

function BreadcrumbComponent({
    path,
    base = "/",
}: {
    path: string[];
    base: string;
}) {
    const links = [];
    for (let i = 0; i < path.length; i++) {
        const current = decodeURIComponent(path[i]);
        const link = base + "/" + path.slice(0, i + 1).join("/");
        links.push(<BreadcrumbSeparator key={`sep-${link}`} />);
        links.push(
            <BreadcrumbItem key={link}>
                {i === path.length - 1 ? (
                    <BreadcrumbPage>{current}</BreadcrumbPage>
                ) : (
                    <BreadcrumbPage>
                        <Link
                            href={link}
                            className={"transition-colors hover:text-sky-400"}>
                            {current}
                        </Link>
                    </BreadcrumbPage>
                )}
            </BreadcrumbItem>
        );
    }
    return (
        <Breadcrumb className="mt-3">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <Link
                            href={base}
                            className={"transition-colors hover:text-sky-400"}>
                            Home
                        </Link>
                    </BreadcrumbPage>
                </BreadcrumbItem>
                {links}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
    BreadcrumbComponent,
};
