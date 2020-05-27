import { CV } from '@models';
import { calculateDuration } from '@utils';

export function parseCVDates(cv: CV): CV {
  cv.sections.experiences.items.forEach((exp) => {
    exp.dates.start = new Date(exp.dates.start);
    if (exp.dates.end) {
      exp.current = false;
      exp.dates.end = new Date(exp.dates.end);
    } else {
      exp.current = true;
      exp.dates.end = new Date();
    }
    exp.duration = calculateDuration(exp.dates.start, exp.dates.end);
  });
  return cv;
}
