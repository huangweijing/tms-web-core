
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components, directives,
  theme: {
    defaultTheme: 'light',
    themes: { light: { colors: { primary: '#1976D2', secondary: '#2196F3', error: '#E53935', success: '#43A047', background: '#FFFFFF', surface: '#FFFFFF' } } }
  },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } }
});
