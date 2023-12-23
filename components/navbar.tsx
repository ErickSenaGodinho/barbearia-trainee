'use client'

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";

export const Navbar = () => {

	const [user] = useLocalStorage("user", null);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">ACME</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden sm:flex text-foreground">
					{user ?
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar name={user.name} as={"button"} />
							</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat">
								{siteConfig.navMenuItems.map((item, index) => (
									<DropdownItem key={`${item}-${index}`} href={item.href}>
										{item.label}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						:
						<Link href="/login" className="gap-3">
							<Avatar showFallback />
							<span>Realizar Login</span>
						</Link>
					}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>
		</NextUINavbar>
	);
};
