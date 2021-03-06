import { Event } from "../../interfaces/lambda-proxy";
import { Suggester } from "../../services/suggest";
import { MOOD, WEATHER, BOT } from "../../services/candidate_sources/base";

const ACCEPTABLE_MOODS = {
  [MOOD.RELAXED]: true,
  [MOOD.HAPPY]: true,
  [MOOD.ANGRY]: true,
  [MOOD.SAD]: true,
  [MOOD.AMAZING]: true,
  [MOOD.SICK]: true,
  [MOOD.DISGUSTING]: true,
  [MOOD.LOVELY]: true,
  [MOOD.SLEEPY]: true,
};

const ACCEPTABLE_WEATHERS = {
  [WEATHER.WARM]: true,
  [WEATHER.COOL]: true,
  [WEATHER.RAINY]: true,
  [WEATHER.SNOWY]: true,
};

const ACCEPTABLE_BOT = {
  [BOT.STEPHANIE]: true,
  [BOT.RUUCM]: true,
};

var process = { env: { SOUNDCLOUD_CLIENT_ID: '761LMfrpB07DQlPhf7rbKo5fLsBuMaKH' } };

export default async function(event: Event) {
  return '';
}

export var suggest_tracks = async function(event: Event) {
  const query = event.queryStringParameters || {};
  const { mood, weather, bot, debug } = query;
  const count = +query.count || 20;

  if (!ACCEPTABLE_MOODS[mood]) {
    return renderError(`mood ${mood} is not allowed value`, 400);
  }

  if (!ACCEPTABLE_WEATHERS[weather]) {
    return renderError(`weather ${weather} is not allowed value`, 400);
  }

  // if (!ACCEPTABLE_BOT[bot]) {
  //   return renderError(`bot ${bot} is not allowed value`, 400);
  // }

  const suggester = new Suggester(mood as MOOD, weather as WEATHER, bot as BOT , process.env.SOUNDCLOUD_CLIENT_ID);
  const candidates = await suggester.suggest(count);
  console.log('suggest_tracks ! ');
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(debug ? candidates.map((v) => v.track) : candidates),
  };
}

function renderError(message: string, statusCode: number = 500) {
  console.log('renderError! : ');
  console.log(message);
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      error: {
        message,
      },
    }),
  };
}
