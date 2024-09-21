import { Schema, model } from "mongoose";

const FlightSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  flight_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  date_utc: {
    type: String,
    required: true,
  },
  date_unix: {
    type: Number,
    required: true,
  },
  date_local: {
    type: String,
    required: true,
  },
  date_precision: {
    type: String,
    required: true,
    enum: ["half", "quarter", "year", "month", "day", "hour"],
  },
  static_fire_date_utc: {
    type: String,
    default: null,
  },
  static_fire_date_unix: {
    type: Number,
    default: null,
  },
  tdb: {
    type: Boolean,
    default: false,
  },
  net: {
    type: Boolean,
    default: false,
  },
  window: {
    type: Number,
    default: null,
  },
  rocket: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  success: {
    type: Boolean,
    default: null,
  },
  failures: [
    {
      time: {
        type: Number,
      },
      altitude: {
        type: Number,
      },
      reason: {
        type: String,
      },
    },
  ],
  upcoming: {
    type: Boolean,
    required: true,
  },
  details: {
    type: String,
    default: null,
  },
  fairings: {
    reused: {
      type: Boolean,
      default: null,
    },
    recovery_attempt: {
      type: Boolean,
      default: null,
    },
    recovered: {
      type: Boolean,
      default: null,
    },
    ships: [Schema.Types.ObjectId],
  },
  crew: [
    {
      crew: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      role: {
        type: String,
        default: null,
      },
    },
  ],
  ships: [Schema.Types.ObjectId],
  capsules: [Schema.Types.ObjectId],
  payloads: [Schema.Types.ObjectId],
  launchpad: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  cores: [
    {
      core: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      flight: {
        type: Number,
        default: null,
      },
      gridfins: {
        type: Boolean,
        default: null,
      },
      legs: {
        type: Boolean,
        default: null,
      },
      reused: {
        type: Boolean,
        default: null,
      },
      landing_attempt: {
        type: Boolean,
        default: null,
      },
      landing_success: {
        type: Boolean,
        default: null,
      },
      landing_type: {
        type: String,
        default: null,
      },
      landpad: {
        type: Schema.Types.ObjectId,
        default: null,
      },
    },
  ],
  links: {
    patch: {
      small: {
        type: String,
        default: null,
      },
      large: {
        type: String,
        default: null,
      },
    },
    reddit: {
      campaign: {
        type: String,
        default: null,
      },
      launch: {
        type: String,
        default: null,
      },
      media: {
        type: String,
        default: null,
      },
      recovery: {
        type: String,
        default: null,
      },
    },
    flickr: {
      small: [String],
      original: [String],
    },
    presskit: {
      type: String,
      default: null,
    },
    webcast: {
      type: String,
      default: null,
    },
    youtube_id: {
      type: String,
      default: null,
    },
    article: {
      type: String,
      default: null,
    },
    wikipedia: {
      type: String,
      default: null,
    },
  },
  auto_update: {
    type: Boolean,
    default: true,
  },
});

export const FlightModel = model("Flight", FlightSchema);
