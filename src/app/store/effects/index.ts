// export * from './search.effects';

// import { SearchEffects } from './search.effects';
import { ProjectEffects } from './project.effects';
import { UserEffects } from './user.effects';
import { ScheduleEffects } from './schedule.effects';

export const effects: any[] = [ ProjectEffects, UserEffects, ScheduleEffects];
