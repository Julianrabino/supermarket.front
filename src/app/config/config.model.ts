export interface Config {
    usersUrl: string;
    bonita: {
      urls: {
        cases: string;
        humanTasks: string;
        activities: string;
        caseVariable: string;
        businessDataVenta: string;
        loginService: string;
        logoutService: string;
      },
      variables: {
          nroDocumento: string;
          productos: string;
      },
      processDefinitionId: string;
      loginUsername: string;
      loginPassword: string;
      apiTokenHeader: string;
    };
    sessionKeys: {
      currentUser: string;
      currentBonitaApiToken: string;
      currentCaseId: string;
      currentTaskId: string;
      currentProducts: string;
      currentCart: string;
    };
  }
