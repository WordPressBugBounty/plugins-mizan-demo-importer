<?php
/*
  Plugin Name:       Mizan Demo Importer
  Plugin URI:        
  Description:       This plugin helps to import demo content using elementor.
  Version:           0.1.2
  Requires at least: 5.2
  Requires PHP:      7.2
  Author:            mizanthemes
  Author URI:        https://www.mizanthemes.com/
  License:           GPL v2 or later
  License URI:       https://www.gnu.org/licenses/gpl-2.0.html
  Text Domain:       mizan-demo-importer
*/

register_activation_hook(__FILE__, 'mizan_importer_activate');
add_action('admin_init', 'mizan_importer_redirect');

function mizan_importer_activate() {
  add_option('mizan_importer_do_activation_redirect', true);
}
function mizan_importer_redirect() {
  if (get_option('mizan_importer_do_activation_redirect', false)) {
    delete_option('mizan_importer_do_activation_redirect');
    wp_redirect("admin.php?page=mizandemoimporter-wizard");
    exit;
  }
}

define( 'MDI_FILE', __FILE__ );
define( 'MDI_BASE', plugin_basename( MDI_FILE ) );
define( 'MDI_DIR', plugin_dir_path( MDI_FILE ) );
define( 'MDI_URL', plugins_url( '/', MDI_FILE ) );
define( 'MDI_THEME_LICENCE_ENDPOINT', 'https://license.mizanthemes.com/api/public/' );
define( 'MIZAN_IMPORTER_TEXT_DOMAIN', "mizan-demo-importer" );
define( 'MIZAN_MAIN_URL', "https://preview.mizanthemes.com/" );
define( 'MDI_NAME', 'Mizan Demo Importer' );

require MDI_DIR .'theme-wizard/config.php';

function mizan_importer_custom_admin_css() {
  echo '<style>
    .toplevel_page_elemento-templates a.toplevel_page_elemento-templates {
        background-color: #93003f !important;
        border-radius: 3px;
        color: #fff !important;
        display: block;
        font-weight: 600 !important;
        transition: all .3s;
    }

    .toplevel_page_elemento-templates a.toplevel_page_elemento-templates .dashicons-admin-page::before {
        color: white !important;
    }

    .toplevel_page_elemento-templates a.toplevel_page_elemento-templates .wp-menu-name {
        font-weight: bold;
    }
  </style>';
}
add_action('admin_head', 'mizan_importer_custom_admin_css');
