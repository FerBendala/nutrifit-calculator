"use client";

import { CalculatorIcon } from '@/components/CalculatorIcon';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CALCULATORS } from '@/lib/calculators';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const MobileMenuContent = () => (
    <div className="flex flex-col space-y-2 pt-6">
      {CALCULATORS.map((calculator) => {
        const Icon = calculator.icon;
        return (
          <Link
            key={calculator.href}
            href={calculator.href}
            onClick={() => setIsOpen(false)}
            className="flex items-start space-x-3 rounded-lg p-4 transition-colors hover:bg-accent"
          >
            <Icon className="h-5 w-5 mt-0.5 text-primary" />
            <div className="space-y-1">
              <div className="font-medium leading-none">
                {calculator.title}
              </div>
              <p className="text-sm text-muted-foreground">
                {calculator.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-golden">
      <div className="container-golden h-[4.236rem] flex items-center justify-between">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-[1.618rem] flex items-center space-x-[0.618rem] transition-golden hover:opacity-80"
            aria-label="NutriFit Calculator - Ir a página principal"
          >
            <CalculatorIcon className="h-8 w-8" size={32} />
            <span className="hidden font-bold sm:inline-block text-lg">
              NutriFit Calculator
            </span>
          </Link>
        </div>

        <>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-[1.618rem] text-base font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Calculadoras</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3">
                      {CALCULATORS.map((calculator) => (
                        <li key={calculator.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={calculator.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center space-x-2">
                                <calculator.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">
                                  {calculator.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {calculator.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden ml-auto">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <CalculatorIcon className="h-6 w-6" size={24} />
                    <SheetTitle>NutriFit Calculator</SheetTitle>
                  </div>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <MobileMenuContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      </div>
    </header>
  );
}