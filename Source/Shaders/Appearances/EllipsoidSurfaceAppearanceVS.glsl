attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute vec3 position2DHigh;
attribute vec3 position2DLow;
attribute vec2 st;

varying vec3 v_positionMC;
varying vec3 v_positionEC;
varying vec2 v_st;

void main() 
{
    vec4 p;
    if (czm_morphTime == 1.0)
    {
        p = czm_translateRelativeToEye(position3DHigh, position3DLow);
    }
    else if (czm_morphTime == 0.0)
    {
        p = czm_translateRelativeToEye(position2DHigh.zxy, position2DLow.zxy);
    }
    else
    {
        p = czm_columbusViewMorph(
            czm_translateRelativeToEye(position2DHigh.zxy, position2DLow.zxy),
            czm_translateRelativeToEye(position3DHigh, position3DLow), 
            czm_morphTime);
    }

    v_positionMC = position3DHigh + position3DLow;           // position in model coordinates
    v_positionEC = (czm_modelViewRelativeToEye * p).xyz;     // position in eye coordinates
    v_st = st;
    
    gl_Position = czm_modelViewProjectionRelativeToEye * p;
}
