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
          productIdCompra: string;
          cuponCompra: string;
          finCompra: string;
          ventaId: string;
      },
      tasks: {
        iniciarCompra: string;
        finalizarCompra: string;
      },
      processDefinitionId: string;
      loginUsername: string;
      loginPassword: string;
      apiTokenHeader: string;
      humanTaskAssignedId: string;
      cantidadIntentosPolling: number;
      msDelayPolling: number;
      cantidadElementosPagina: number;
    };
    sessionKeys: {
      currentUser: string;
      currentBonitaApiToken: string;
      currentCaseId: string;
      currentTaskId: string;
      currentProducts: string;
      currentCart: string;
      currentVenta: string;
    };
  }
