import { ProjectListEffects } from './projectList.effects';
import { UserInfoEffects } from './userInfo.effects';
import { ScheduleListEffects } from './scheduleList.effects';
import { RoleListEffects } from './roleList.effects';
import { MemberEffects } from './memberList.effects';
import { CurrentProjectEffects } from './currentProject.effects';

export const effects: any[] = [
    ProjectListEffects,
    CurrentProjectEffects,
    UserInfoEffects,
    ScheduleListEffects,
    RoleListEffects,
    MemberEffects
];
