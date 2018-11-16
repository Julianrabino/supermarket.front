export interface Config {
    usersUrl: string;
    bonita: {
      urls: {
        cases: string;
        humanTasks: string;
        activities: string;
        caseVariable: string;
        businessDataVenta: string;
      },
      variables: {
          nroDocumento: string;
      },
      processDefinitionId: string;
    };
    bonitaLoginService: string;
    bonitaLogoutService: string;
    bonitaCases: string;
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
      currentCaseId: string;
    };
  }
