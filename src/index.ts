import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IConsoleTracker } from '@jupyterlab/console';

/**
 * Initialization data for the replite extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'replite:plugin',
  autoStart: true,
  optional: [IConsoleTracker],
  activate: (app: JupyterFrontEnd, tracker: IConsoleTracker) => {
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const code = urlParams.getAll('code');
    if (!code) {
      return;
    }
    tracker.widgetAdded.connect((_, widget) => {
      const { console } = widget;
      console.promptCellCreated.connect(() => {
        if (console.promptCell) {
          console.promptCell.model.value.text = code.join('\n');
        }
      });
    });
  }
};

export default plugin;
