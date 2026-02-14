"use client";

import { CalculatorIcon } from '@/components/CalculatorIcon';
import { ThemeToggle } from '@/components/ThemeToggle';
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
import { getCalculatorsByCategory } from '@/lib/calculators';
import { Apple, BarChart3, BookOpen, Dumbbell, HeartPulse, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Configuración de categorías con sus nombres en español
const CATEGORIES = [
  { key: 'nutrition', name: 'Nutrición', icon: Apple },
  { key: 'body-composition', name: 'Composición Corporal', icon: BarChart3 },
  { key: 'fitness', name: 'Fitness', icon: Dumbbell },
  { key: 'health', name: 'Salud', icon: HeartPulse },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const MobileMenuContent = () => (
    <div className="flex flex-col space-y-4 pt-6">
      {/* Enlace al Blog */}
      <Link
        href="/blog/"
        onClick={() => setIsOpen(false)}
        className="group flex items-start gap-3 rounded-xl p-4 mb-2 transition-all hover:bg-accent hover:shadow-sm border border-border/50 bg-muted/30"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="font-semibold leading-tight text-base group-hover:text-primary transition-colors">
            Blog de Nutrición
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Artículos profesionales sobre fitness y salud
          </p>
        </div>
      </Link>

      {/* Calculadoras por categoría */}
      {CATEGORIES.map((category) => {
        const categoryCalculators = getCalculatorsByCategory(category.key as 'nutrition' | 'body-composition' | 'fitness' | 'health');
        if (categoryCalculators.length === 0) return null;

        const CategoryIcon = category.icon;
        return (
          <div key={category.key} className="space-y-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-muted/50 border-b border-border/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <CategoryIcon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {category.name}
              </span>
            </div>
            <div className="space-y-1.5 px-2">
              {categoryCalculators.map((calculator) => {
                const Icon = calculator.icon;
                return (
                  <Link
                    key={calculator.href}
                    href={calculator.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-accent hover:shadow-sm active:scale-[0.98]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="font-medium leading-tight text-sm text-foreground group-hover:text-primary transition-colors">
                        {calculator.title}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {calculator.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
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
                    <div className="grid w-max gap-3 p-4 md:w-[850px] md:grid-cols-2 lg:w-[1100px] lg:grid-cols-4">
                      {CATEGORIES.map((category) => {
                        const categoryCalculators = getCalculatorsByCategory(category.key as 'nutrition' | 'body-composition' | 'fitness' | 'health');
                        if (categoryCalculators.length === 0) return null;

                        const CategoryIcon = category.icon;
                        return (
                          <div key={category.key} className="space-y-2.5">
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/50">
                              <CategoryIcon className="h-4 w-4 text-primary" />
                              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                {category.name}
                              </span>
                            </div>
                            <ul className="space-y-0.5">
                              {categoryCalculators.map((calculator) => (
                                <li key={calculator.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={calculator.href}
                                      className="group block select-none rounded-lg p-2.5 leading-none no-underline outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                          <calculator.icon className="h-4 w-4 text-primary flex-shrink-0" />
                                        </div>
                                        <div className="text-xs font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                                          {calculator.title}
                                        </div>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/blog/"
                    className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Blog</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Theme Toggle - Desktop */}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle />
            
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