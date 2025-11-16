import 'whatwg-fetch';

jest.spyOn(global.console, 'error').mockImplementation((...args: any[]) => {
  const msg = String(args[0] ?? '');
  if (msg.includes('Warning:')) return; 
  // @ts-ignore
  console._errorOriginal?.(...args);
});

// @ts-ignore
console._errorOriginal = console.error;