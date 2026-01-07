# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/home/mykael/esp/v5.5.2/esp-idf/components/bootloader/subproject"
  "/home/mykael/esp/dth11/build/bootloader"
  "/home/mykael/esp/dth11/build/bootloader-prefix"
  "/home/mykael/esp/dth11/build/bootloader-prefix/tmp"
  "/home/mykael/esp/dth11/build/bootloader-prefix/src/bootloader-stamp"
  "/home/mykael/esp/dth11/build/bootloader-prefix/src"
  "/home/mykael/esp/dth11/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/mykael/esp/dth11/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/mykael/esp/dth11/build/bootloader-prefix/src/bootloader-stamp${cfgdir}") # cfgdir has leading slash
endif()
