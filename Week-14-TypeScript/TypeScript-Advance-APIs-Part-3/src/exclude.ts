type EventUser = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventUser, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK