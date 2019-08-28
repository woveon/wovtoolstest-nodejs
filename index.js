const exec   = require('child_process').exec;

if ( process.env.WOV_STAGE == 'prod' ) {
  console.log('In "prod" stage. Can not run tests since could destroy production data');
  process.exit(1);
  throw Error(1);
}

global.pgReset = async function(_ds = null) {
  let ds = 'alywan' || _ds;
  return new Promise( (res, rej) => {
    console.time('pgReset');
    exec(`wov-db alywandb --ds-reload ${ds}`, function(e) {
      if ( e ) { console.error(e); rej(e); }
      console.timeEnd('pgReset');
      res(true);
    });
  });
};

global.pgTruncateTable = async function(_table) { return await C.data('db').query(`TRUNCATE ${_table}`); };

global.TESTCONTROL = process.env.WOV_TEST || 'all';

