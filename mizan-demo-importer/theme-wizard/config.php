<?php
/**
 * Settings for theme wizard
 *
 * @package Whizzie
 * @author Catapult Themes
 * @since 1.0.0
 */

/**
 * Define constants
 **/
if ( ! defined( 'MIZAN_IMPORTER_WHIZZIE_DIR' ) ) {
	define( 'MIZAN_IMPORTER_WHIZZIE_DIR', dirname( __FILE__ ) );
}
// Load the Whizzie class and other dependencies
require trailingslashit( MIZAN_IMPORTER_WHIZZIE_DIR ) . 'mizan_exporter_whizzie.php';
/**
 * Make changes below
 **/

// Change the title and slug of your wizard page
$mizan_importer_config['page_slug'] 	= 'mizan-demo-importer';
$mizan_importer_config['page_title']	= 'Quick Start';
$mizan_importer_config['page_heading']	= 'Mizan Demo Importer';

$mizan_importer_config['steps'] = array(
	'intro' => array(
		'id'            => 'intro',
		'title'            => 'Welcome to Mizan Demo Importer',
		'icon'            => 'dashboard',
		'view'            => 'get_step_intro', // Callback for content
		'callback'        => 'do_next_step', // Callback for JS
		'button_text'    => 'Start Now',
		'can_skip'        => false, // Show a skip button?
		'icon_url'      => MDI_URL . 'theme-wizard/assets/images/battery.png'
	),
	'plugins' => array(
		'id'			=> 'plugins',
		'title'			=> 'Plugins',
		'icon'			=> 'admin-plugins',
		'button_text'	=> 'Install Plugins',
		'can_skip'		=> true,
		'icon_url'      => MDI_URL . 'theme-wizard/assets/images/plugin.png'
	),
	'widgets' => array(
		'id'			=> 'widgets',
		'title'			=> 'Demo Importer',
		'icon'			=> 'welcome-widgets-menus',
		'view'			=> 'get_step_widgets',
		'callback'		=> 'install_widgets',
		'button_text'	=> 'Import Demo',
		'can_skip'		=> true
	),
	'done' => array(
		'id'			=> 'done',
		'title'			=> 'All Done',
		'icon'			=> 'yes',
		'icon_url'      => MDI_URL . 'theme-wizard/assets/images/check-mark.png'
	)
);

/**
 * This kicks off the wizard
 **/
if( class_exists( 'Mizan_Importer_ThemeWhizzie' ) ) {
	$Mizan_Importer_ThemeWhizzie = new Mizan_Importer_ThemeWhizzie( $mizan_importer_config );
}
