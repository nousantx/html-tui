import type { DefinedValue, Classes } from '@tenoxui/core/full'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { generateColors } from '@nousantx/color-generator'
import { merge, createProperty, transformClasses } from '@nousantx/someutils'
import { property } from '@tenoxui/property'
import { standardAttributes } from '@nousantx/list-attribute'

const color = {
  neutral: '#575757',
  primary: '#3a7ae5',
  red: '#ef1a1a'
}

const globalStyles = `
(body): bg-neutral-50 text-neutral-950 [transition]-300ms;
(main): w-mx-1340px mx-auto w-100% h-mn-100vh;
(p,a,.text): fs-0.8em fw-500 lh-1.35 ls--0.015em text-neutral-100;
(.light): text-neutral-950 fw-600;
(a.reset): td-none;
(.center): d-flex flex-parent-center;
(.skill): fs-12px lh-1 ls--0.035em text-neutral-700 bw-1px d-inline-flex flex-parent-center h-24px px-8px br-999px bs-solid bc-currentColor bw-1px;
(*[class*='bg-'],*[bg]): [--bg-opacity]-1;
(*[class*='text-'],*[text]): [--text-opacity]-1;
`

export const initApp = {
  darkColor: generateColors({
    color,
    option: {
      format: 'object2',
      output: 'rgb-only'
    }
  }) as DefinedValue,
  lightColor: generateColors({
    color,
    option: {
      format: 'object2',
      output: 'rgb-only',
      reverse: true
    }
  }) as DefinedValue,
  applyStyles() {
    document.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({
        element: element as HTMLElement,
        property: {
          ...property,
          ...createProperty(
            {
              bg: 'backgroundColor',
              text: 'color',
              shadow: '--shadow-color',
              'bdr-c': 'borderColor'
            },
            'rgb({0} / var(--{1}-opacity, 1))'
          ),
          'bw-b': 'borderBottomWidth',
          'bg-opacity': '--bg-opacity',
          'text-opacity': '--text-opacity',
          rotate: {
            property: 'transform',
            value: 'rotate({0})'
          },
          img: {
            property: 'backgroundImage',
            value: 'url({0})'
          },
          'back-blur': {
            property: 'backdropFilter',
            value: 'blur({0})'
          }
        },
        values: merge((this.isDarkMode() ? this.darkColor : this.lightColor) as DefinedValue, {
          red: '255 0 0',
          family: {
            code: 'JetBrains Mono'
          },
          full: '100%'
        }),
        classes: merge(
          transformClasses({
            'my-shunshine': {
              display: 'flex',
              justifyContent: 'space-between'
            }
          }),

          {
            display: {
              flex: 'flex'
            },
            boxShadow: {
              'shadow-sm': '0 1px 2px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.05))',
              shadow:
                '0 1px 3px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 1px 2px -1px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
              'shadow-md':
                '0 4px 6px -1px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 2px 4px -2px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
              'shadow-lg':
                '0 10px 15px -3px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 4px 6px -4px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
              'shadow-xl':
                '0 20px 25px -5px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 8px 10px -6px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
              'shadow-2xl':
                '0 25px 50px -12px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.25))',
              'shadow-inner':
                'inset 0 2px 4px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.05))',
              'shadow-none': '0 0 #0000'
            }
          }
        ) as Classes,
        attributify: true,
        attributifyIgnore: standardAttributes
      }).useDOM()
    })
  },
  getTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem('theme')
    return theme === 'light' || theme === 'dark' ? theme : 'dark'
  },
  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    this.applyStyles()
  },
  isDarkMode() {
    return this.getTheme() === 'dark'
  },
  toggleTheme() {
    const newTheme = this.isDarkMode() ? 'light' : 'dark'
    this.setTheme(newTheme)
  },
  init() {
    document.documentElement.setAttribute('child', globalStyles)
    this.setTheme(this.getTheme())
    const themeToggle = document.getElementById('themeToggle')
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme())
    }
  }
}

export const run = () => initApp.init()
