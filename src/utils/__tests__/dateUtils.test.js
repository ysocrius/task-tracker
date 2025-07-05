import { 
  formatDate, 
  formatDueDate, 
  getDueDateStatus, 
  getTodayString, 
  isValidFutureDate 
} from '../dateUtils';

describe('Date Utility Functions', () => {
  // Mock the Date object for consistent testing
  const mockDate = new Date(2024, 0, 15); // January 15, 2024
  const originalDate = global.Date;
  
  beforeEach(() => {
    global.Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          return mockDate;
        }
        return new originalDate(...args);
      }
      static now() {
        return mockDate.getTime();
      }
    };
  });
  
  afterEach(() => {
    global.Date = originalDate;
  });
  
  describe('formatDate', () => {
    it('formats a date string with time', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const result = formatDate(dateString);
      
      // The exact format may vary by locale, but should include the date and time
      expect(result).toContain('2024');
      expect(result).toContain('Jan');
      expect(result).toContain('15');
    });
    
    it('returns empty string for null or undefined input', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
    
    it('returns the original string if formatting fails', () => {
      const invalidDate = 'not-a-date';
      const originalConsoleError = console.error;
      console.error = jest.fn(); // Mock console.error to avoid test output noise
      
      const result = formatDate(invalidDate);
      expect(result).toBe(invalidDate);
      expect(console.error).not.toHaveBeenCalled(); // Won't be called since we handle invalid dates
      
      // Test the actual error handling with an error
      const mockDateFn = jest.spyOn(global, 'Date');
      mockDateFn.mockImplementationOnce(() => {
        throw new Error('Date error');
      });
      
      const errorResult = formatDate('2024-01-01');
      expect(errorResult).toBe('2024-01-01');
      expect(console.error).toHaveBeenCalled();
      
      // Restore the original console.error function
      console.error = originalConsoleError;
      mockDateFn.mockRestore();
    });
  });
  
  describe('formatDueDate', () => {
    it('formats a due date string without time', () => {
      const dateString = '2024-01-20';
      const result = formatDueDate(dateString);
      
      // The exact format may vary by locale, but should include the date
      expect(result).toContain('2024');
      expect(result).toContain('Jan');
      expect(result).toContain('20');
      // Should not contain time
      expect(result).not.toMatch(/\d{1,2}:\d{2}/);
    });
    
    it('returns empty string for null or undefined input', () => {
      expect(formatDueDate(null)).toBe('');
      expect(formatDueDate(undefined)).toBe('');
    });
  });
  
  describe('getDueDateStatus', () => {
    it('returns "overdue" for past dates', () => {
      const pastDate = '2024-01-10'; // 5 days before mock date
      expect(getDueDateStatus(pastDate)).toBe('overdue');
    });
    
    it('returns "approaching" for dates within 2 days', () => {
      const approachingDate = '2024-01-16'; // 1 day after mock date
      expect(getDueDateStatus(approachingDate)).toBe('approaching');
    });
    
    it('returns empty string for dates more than 2 days away', () => {
      const futureDate = '2024-01-20'; // 5 days after mock date
      expect(getDueDateStatus(futureDate)).toBe('');
    });
    
    it('returns empty string for null or undefined input', () => {
      expect(getDueDateStatus(null)).toBe('');
      expect(getDueDateStatus(undefined)).toBe('');
    });
  });
  
  describe('getTodayString', () => {
    it('returns today\'s date in YYYY-MM-DD format', () => {
      expect(getTodayString()).toBe('2024-01-15');
    });
  });
  
  describe('isValidFutureDate', () => {
    it('returns true for today\'s date', () => {
      const today = '2024-01-15';
      expect(isValidFutureDate(today)).toBe(true);
    });
    
    it('returns true for future dates', () => {
      const futureDate = '2024-01-20';
      expect(isValidFutureDate(futureDate)).toBe(true);
    });
    
    it('returns false for past dates', () => {
      const pastDate = '2024-01-10';
      expect(isValidFutureDate(pastDate)).toBe(false);
    });
    
    it('returns true for null or undefined input', () => {
      expect(isValidFutureDate(null)).toBe(true);
      expect(isValidFutureDate(undefined)).toBe(true);
    });
  });
}); 