"c:\Program Files (x86)\WiX Toolset v3.11\bin"\candle -ext WixUtilExtension Product.wxs 
"c:\Program Files (x86)\WiX Toolset v3.11\bin"\light -ext WixUIExtension -ext WixUtilExtension -cultures:zh-cn -loc zh-cn.wxl -dWixUILicenseRtf=eula_zh-cn.rtf Product.wixobj 
