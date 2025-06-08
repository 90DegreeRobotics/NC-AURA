import React from 'react';

// Generic Icon Props
interface IconProps extends React.SVGProps<SVGSVGElement> {
  // You can add more common props here if needed
}

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 01-1.732-1.732L12 8.25l2.188-1.25a2.25 2.25 0 011.732-1.732L18.25 3l1.25 2.188a2.25 2.25 0 011.732 1.732L23.75 8.25l-2.188 1.25a2.25 2.25 0 01-1.732 1.732L18.25 12z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

// Icons from AURA
export const IconVolumeUp: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

export const IconVolumeOff: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0L21.75 14.25M19.5 12L21.75 9.75M19.5 12L17.25 14.25M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const IconMicrophone: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c.966 0 1.844-.184 2.649-.511m-5.298 0A9.002 9.002 0 0012 15m-2.649-5.511C9.156 9.316 9 8.438 9 7.5V5.25c0-.966.184-1.844.511-2.649A9.002 9.002 0 0112 2.25c.966 0 1.844.184 2.649.511C15.816 3.406 16 4.284 16 5.25v2.25c0 .966-.184 1.844-.511 2.649m-5.298 0C9.156 9.316 9 8.438 9 7.5" />
  </svg>
);

export const IconMicrophoneOff: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.06 15.06L8.94 8.94M12 18.75a6 6 0 004.243-1.757L12 12.75V18.75zm0-11.25a6 6 0 00-4.243 1.757L12 12.75V7.5zm2.599 9.085c.152.563.226 1.146.226 1.74V15m0-7.5V5.25c0-.594-.074-1.177-.226-1.74M9.401 6.415c-.152-.563-.226-1.146-.226-1.74V7.5m0 7.5v2.25c0 .594.074 1.177.226 1.74M12 21.75v-3.75m-3.75 0h7.5M3.375 7.5c0-3.217 2.72-5.625 6.125-5.625S15.625 4.283 15.625 7.5v1.5c0 .426-.04.844-.116 1.252" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 3.375l17.25 17.25" />
  </svg>
);

export const IconXMark: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// Removed ChevronDownIcon, ChevronUpIcon, DocumentArrowUpIcon as they are not used in the merged app