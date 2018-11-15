export interface Config {
    usersUrl: string;
    bonitaLoginService: string;
    bonitaStartProcess: string;
    bonitaHumanTasks: string;
    bonitaActivities: string;
    bonitaCaseVariable: string;
    bonitaBusinessDataVenta: string;
    bonitaLoginUsername: string;
    bonitaLoginPassword: string;
    bonitaApiTokenHeader: string;
    sessionKeys: {
      currentUser: string;
      currentBonitaApiToken: string;
    };
  }
