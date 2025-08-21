"use client";

import { CalculatorIcon } from '@/components/CalculatorIcon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Activity, Calculator, Droplet, Scale, Zap } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const calculators = [
    {
      title: 'Calorías y Macros',
      href: '/',
      description: 'Calculadora principal con distribución de macronutrientes',
      icon: Calculator
    },
    {
      title: 'IMC',
      href: '/imc',
      description: 'Índice de masa corporal y categorías OMS',
      icon: Scale
    },
    {
      title: 'TDEE',
      href: '/tdee',
      description: 'Gasto calórico diario total',
      icon: Activity
    },
    {
      title: 'Proteína',
      href: '/proteina',
      description: 'Necesidades diarias de proteína',
      icon: Zap
    },
    {
      title: 'Agua',
      href: '/agua',
      description: 'Hidratación diaria recomendada',
      icon: Droplet
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CalculatorIcon className="h-6 w-6" size={24} />
            <span className="hidden font-bold sm:inline-block">
              Calculadora Fitness
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Calculadoras</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {calculators.map((calculator) => (
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
        </div>
      </div>
    </header>
  );
}