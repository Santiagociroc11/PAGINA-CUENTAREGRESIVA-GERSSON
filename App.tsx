import React, { useState, useEffect, useMemo } from 'react';
import { TimeLeft } from './types';
import CountdownCard from './components/CountdownCard';
import ActionButton from './components/ActionButton';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [userTimeZone, setUserTimeZone] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const targetDate = useMemo(() => new Date('2025-10-27T19:00:00-05:00'), []); // October 27, 2025, 7:00 PM Colombia Time (COT)

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(tz);
    } catch (e) {
      setUserTimeZone('Unknown');
    }
    
    const updateTimers = () => {
      const now = new Date();
      const difference = +targetDate - +now;
      let newTimeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(newTimeLeft);
      setCurrentTime(now);
    };

    const timer = setInterval(updateTimers, 1000);
    
    // Initial call to set state immediately
    updateTimers();

    return () => clearInterval(timer);
  }, [targetDate]);
  
  const eventDetails = {
    title: 'Fórmula de la Eliminación del Dolor',
    description: 'Evento virtual y gratuito del 27 al 29 de Octubre de 2025. ¡No te pierdas este evento importante!',
    startTimeUTC: '20251028T000000Z', // Oct 27, 7PM COT is Oct 28, 00:00 UTC
    endTimeUTC: '20251030T020000Z', // Ends Oct 29, 9PM COT (approx)
  };

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startTimeUTC}/${eventDetails.endTimeUTC}&details=${encodeURIComponent(eventDetails.description)}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${window.location.href}`,
    `DTSTART:${eventDetails.startTimeUTC}`,
    `DTEND:${eventDetails.endTimeUTC}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
  const icsLink = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  const userOffsetHours = -currentTime.getTimezoneOffset() / 60;
  const colombiaOffsetHours = -5;
  const hourDifference = userOffsetHours - colombiaOffsetHours;
  const eventTimeInUserTZ = targetDate.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Fórmula de la Eliminación del Dolor
        </h1>
        <p className="mt-2 text-base sm:text-lg lg:text-xl text-slate-300">
          Evento virtual y gratuito | 27 al 29 de Octubre, 2025
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-10 sm:mb-12">
        <CountdownCard value={timeLeft.days} label="Días" />
        <CountdownCard value={timeLeft.hours} label="Horas" />
        <CountdownCard value={timeLeft.minutes} label="Minutos" />
        <CountdownCard value={timeLeft.seconds} label="Segundos" />
      </div>
      
      <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-slate-700 mb-10 sm:mb-12 max-w-md w-full">
        <p className="text-slate-300">
          Hora actual en tu país: <span className="font-bold text-cyan-400 tabular-nums">{currentTime.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}</span>
        </p>
        <p className="text-slate-300 mt-2">
          {hourDifference === 0
            ? 'Estás en la misma zona horaria que Colombia.'
            : `Estás a ${Math.abs(hourDifference)} hora${Math.abs(hourDifference) === 1 ? '' : 's'} de diferencia (${hourDifference > 0 ? 'adelantado' : 'atrasado'}).`}
        </p>
        <p className="text-slate-300 mt-2">
          El evento comenzará a las <span className="font-bold text-cyan-400">{eventTimeInUserTZ}</span> en tu horario local.
        </p>
      </div>

       <div className="flex flex-col sm:flex-row items-center gap-4">
         <ActionButton
          href="https://www.youtube.com"
          label="Ir a YouTube"
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>}
        />
        <ActionButton
          href={googleCalendarLink}
          label="Calendario Android"
          className="bg-green-600 hover:bg-green-700 focus:ring-green-500/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>}
        />
        <ActionButton
          href={icsLink}
          download="evento_formula_dolor.ics"
          label="Calendario iOS"
          className="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500/50"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L8 5c-.67 0-1.27.33-1.63.84L5 8h14l-1.37-2.16zM19 19H5V9h14v10z" opacity=".3"/><path d="M16 5c.67 0 1.27.33 1.63.84L19 8v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8l1.37-2.16C6.73 5.33 7.33 5 8 5h8zm-1.63.84L13 8H6.37L5 9.37V19h14V9.37L17.63 8H11l1.37-2.16zM19 8H5l-1.37 2.16L5 9v10h14V9l-1.37-2.16L19 8z"/></svg>}
        />
      </div>

      <div className="absolute bottom-4 text-center text-xs text-slate-500">
        <p>Tu zona horaria detectada: {userTimeZone}</p>
        <p>El temporizador está sincronizado con la hora de Colombia (COT / UTC-5).</p>
      </div>
    </div>
  );
};

export default App;