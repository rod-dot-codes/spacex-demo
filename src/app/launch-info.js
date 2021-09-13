import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../styles.css';

@customElement('launch-info')
class LaunchInfo extends LitElement {
    createRenderRoot() {
        return this; // turn off shadow dom to access external styles
    }

    @property()
    launch = null;

    @property()
    width = null;

    successFailureStyle() {
        return this.launch ? this.launch.data.launch_success ? 'bg-green-300' : 'bg-red-300' : 'bg-grey-300';
    }

    render() {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        if (!this.launch) {
            return html`<span></span>`;
        }
        return html`<div style="${this.width ? `width: ${this.width}` : ''}" class="max-w-md rounded overflow-hidden shadow-lg my-2 ${this.successFailureStyle()}">
        
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${this.launch.data.mission_name}</div>
          <p class="text-grey-darker text-base">
            ${this.launch.data.details}
          </p>
        </div>
        <div class="px-6 py-4">
          <div class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">${new Date(this.launch.data.launch_date_utc).toLocaleString([], options)}</div>
          <div class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
          ${this.launch.data.launch_site.site_name_long}</div>
          <div class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
          ${this.launch.data.rocket.rocket_name}</div>
        </div>
      </div>`;
    }
}