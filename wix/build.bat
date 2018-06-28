"c:\Program Files (x86)\WiX Toolset v3.11\bin"\candle -ext WixUtilExtension Product.wxs 
rem "c:\Program Files (x86)\WiX Toolset v3.11\bin"\light -ext WixUIExtension -ext WixUtilExtension Product.wixobj
"c:\Program Files (x86)\WiX Toolset v3.11\bin"\light -ext WixUIExtension -ext WixUtilExtension -cultures:zh-cn -loc zh-cn.wxl Product.wixobj 
