require("@rails/ujs").start();
require("@rails/activestorage").start();
require("channels");
import ProgramChannel from "channels/program_channel";
import * as ActionCable from "@rails/actioncable";

ActionCable.logger.enabled = true;

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);