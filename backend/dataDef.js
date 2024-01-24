
const dataDef = () => {
    return [
        {
            grp_cd:'inv01',
            dtl_cd:'R001',
            dtl_cd_nm:'array-01-01-power',
            dtl_cd_desc:'어레이-01-01 발전량',
            unit_cd:'kW',
            ord:1
        },
        {
            grp_cd:'inv01',
            dtl_cd:'R002',
            dtl_cd_nm:'array-01-01-vol',
            dtl_cd_desc:'어레이-01-01 전압',
            unit_cd:'V',
            ord:2
        },
        {
            grp_cd:'inv01',
            dtl_cd:'R003',
            dtl_cd_nm:'array-01-01-cur',
            dtl_cd_desc:'어레이-01-01 전류',
            unit_cd:'A',
            ord:3
        },
    ];
};
module.exports=dataDef;